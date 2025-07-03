package user

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

var jwtKey = []byte("H4U9*ks91_!dPz8H2rP!aKx#fSd7L3vB")

type User struct {
	ID         int    `gorm:"column:id"`
	Nama       string `gorm:"column:nama"`
	Password   string `gorm:"column:password"`
	Favorit    string `gorm:"column:favorit"`
	Kreditskor int    `gorm:"column:kreditskor"`
}

func GenerateJWT(userID int, nama string) (string, error) {
	// Buat claims
	claims := jwt.MapClaims{
		"user_id": userID,
		"nama":    nama,
		"exp":     time.Now().Add(24 * time.Hour).Unix(), // expired 1 hari
	}

	// Buat token dengan metode HS256
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Tanda tangani token
	return token.SignedString(jwtKey)
}

func Login(Nama, Password string, db *gorm.DB) interface{} {
	var user User

	// Cari user berdasarkan nama dan password
	result := db.Where("nama = ? AND password = ?", Nama, Password).First(&user)

	if result.Error != nil || result.RowsAffected == 0 {
		return map[string]string{
			"status":     "gagal",
			"penjelasan": "data tidak ditemukan atau terjadi kesalahan",
		}
	}

	// Generate token
	token, err := GenerateJWT(user.ID, user.Nama)
	if err != nil {
		return map[string]string{
			"status":     "gagal",
			"penjelasan": "gagal membuat token",
		}
	}

	return map[string]interface{}{
		"status": "berhasil",
		"data":   user,
		"token":  token,
	}
}

func Daftar(Nama, Password string, db *gorm.DB) map[string]string {

	var existing User
	if err := db.Where("nama = ?", Nama).First(&existing).Error; err == nil {
		// Kalau user sudah ada
		return map[string]string{
			"status":     "gagal",
			"penjelasan": "nama sudah terdaftar",
		}
	}

	// Buat user baru
	newUser := User{
		Nama:       Nama,
		Password:   Password,
		Favorit:    "",
		Kreditskor: 0,
	}

	// Simpan ke database
	if err := db.Create(&newUser).Error; err != nil {
		return map[string]string{
			"status":     "gagal",
			"penjelasan": "terjadi kesalahan saat menyimpan data",
		}
	}

	return map[string]string{
		"status":     "berhasil",
		"penjelasan": "data telah berhasil dimasukkan sepenuhnya",
	}
}
