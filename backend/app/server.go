package app

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/anan112pcmec/backend/app/user"

)

type Server struct {
	DB     *gorm.DB
	Router *mux.Router
}

type Appsetting struct {
	AppName, AppConf, AppPort string
}

type Dataconfig struct {
	dbHost, dbUser, dbPass, dbPort string
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Izinkan semua origin - atau ganti dengan asal yang kamu izinkan saja
		w.Header().Set("Access-Control-Allow-Origin", getenvi("ACCESS_CTRL", "Unauthorized"))
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			return // Preflight CORS request
		}

		next.ServeHTTP(w, r)
	})
}

func (server *Server) initialize(appconfig Appsetting) {
	fmt.Println("Inisialisasi server:", appconfig.AppName)
	server.Router = mux.NewRouter()
	server.Router.Use(enableCORS)

	var dbConfig = Dataconfig{
		dbHost: getenvi("DBHOST", "localhost"),
		dbUser: getenvi("DBUSER", "postgres"),
		dbPass: getenvi("DBPASS", "Faiz"),
		dbPort: getenvi("DBPORT", "8082"),
	}

	var err error

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=perpustakaanfaiz port=%s sslmode=disable TimeZone=Asia/Jakarta",
		dbConfig.dbHost, dbConfig.dbUser, dbConfig.dbPass, dbConfig.dbPort,
	)

	fmt.Println("DSN yang digunakan:", dsn)

	// Membuka koneksi ke database dengan GORM
	server.DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	fmt.Println("GORM Logger aktif!")

	if err != nil {
		panic("Server Gagal Menyambungkan ke database")
	} else {
		fmt.Println("Berhasil terhubung ke database:", "kasir_go")
		fmt.Println("DB_NAME dari .env:", os.Getenv("DB_NAME"))
	}

	// 🔍 Cek database yang benar-benar digunakan oleh PostgreSQL
	var currentDB string
	server.DB.Raw("SELECT current_database();").Scan(&currentDB)
	fmt.Println("Database yang sedang digunakan:", currentDB)

	// Route root
	server.Router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Halo dari " + appconfig.AppName))
	})

	// Route endpoint.go
	server.Router.HandleFunc("/endpoint.go", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			fmt.Println("Ada request POST")

			var data struct {
				Tujuan interface{} `json:"tujuan"`
				Nama   string      `json:"nama"`
				Pw     string      `json:"password"`
			}

			err := json.NewDecoder(r.Body).Decode(&data)
			if err != nil {
				http.Error(w, "Gagal parsing JSON: "+err.Error(), http.StatusBadRequest)
				return
			}

			data_kiriman := "Mantap kau"

			fmt.Println("Tujuan yang dikirim:", data.Tujuan, data_kiriman)

			if data.Tujuan == nil {
				fmt.Println("Request tak di proses Tujuan Tak jelas")
			} else if data.Tujuan.(string) == "login" {
				Hasil_Akhir := user.Login(data.Nama, data.Pw, server.DB)
				w.Header().Set("Content-Type", "application/json")
				if err := json.NewEncoder(w).Encode(Hasil_Akhir); err != nil {
					http.Error(w, "Gagal mengencode JSON", http.StatusInternalServerError)
				}
			} else if data.Tujuan == "daftarakun" {
				Hasil_Daftar := user.Daftar(data.Nama, data.Pw, server.DB)
				w.Header().Set("Content-Type", "application/json")
				if err := json.NewEncoder(w).Encode(Hasil_Daftar); err != nil {
					http.Error(w, "Gagal mengencode JSON", http.StatusInternalServerError)
				}
			}

		} else {
			fmt.Println("Ada request ke /endpoint.go dengan method:", r.Method)
			w.Write([]byte("Gunakan POST untuk mengirim data."))
		}
	}).Methods("POST", "OPTIONS")

}

func (server *Server) Run(alamat string) {
	fmt.Printf("Berjalan di port %s\n", alamat)
	log.Fatal(http.ListenAndServe(alamat, server.Router))
}

func getenvi(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return fallback
}

func Run() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error di env")
	}
	var server = Server{}
	var appconfig = Appsetting{
		AppName: getenvi("APPNAME", "backend"),
		AppConf: getenvi("APPENV", "developmentcoy"),
		AppPort: getenvi("APPPORT", "8081"),
	}

	server.initialize(appconfig)
	server.Run(appconfig.AppPort)
}
