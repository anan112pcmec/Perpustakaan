# Gunakan image dasar Go
FROM golang:1.24

# Set working directory
WORKDIR /backend

# Salin go.mod dan go.sum dulu (caching layer)
COPY go.mod .
COPY go.sum .

# Ambil dependencies
RUN go mod download

# Salin semua file backend ke dalam container
COPY . .

# Jalankan program langsung
CMD ["go", "run", "main.go"]
