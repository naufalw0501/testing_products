@echo off
set SERVER=http://localhost:3000

:menu
cls
echo ========================================
echo          Testing API Products
echo ========================================
echo 1. Tampilkan Semua Produk (GET /products)
echo 2. Tambah Produk Baru (POST /products)
echo 3. Tampilkan Produk Berdasarkan ID (GET /products/:id)
echo 4. Hapus Produk Berdasarkan ID (DELETE /products/:id)
echo 5. Keluar
echo ========================================
set /p choice=Pilihan Anda: 

if %choice%==1 goto get_all
if %choice%==2 goto post_product
if %choice%==3 goto get_product
if %choice%==4 goto delete_product
if %choice%==5 goto exit
goto menu

:get_all
cls
echo Menampilkan Semua Produk (JSON):
curl -X GET "%SERVER%/products"
echo.  & REM 
echo Menampilkan Semua Produk (Format Table):
node formatTable.js /products
pause
goto menu

:post_product
cls
set /p name=Masukkan Nama Produk: 
set /p price=Masukkan Harga Produk: 
curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"%name%\",\"price\":%price%}" "%SERVER%/products"
pause
goto menu

:get_product
cls
set /p id=Masukkan ID Produk: 
echo Menampilkan Produk Berdasarkan ID (JSON):
curl -X GET "%SERVER%/products/%id%"
echo.  & REM 
echo Menampilkan Produk Berdasarkan ID (Format Table):
node formatTable.js /products/%id%
pause
goto menu

:delete_product
cls
set /p id=Masukkan ID Produk yang akan dihapus: 
curl -X DELETE "%SERVER%/products/%id%"
pause
goto menu

:exit
echo Keluar dari program.
pause
exit
