@echo off
chcp 65001 >nul
echo ======================================================
echo    Meros International - GitHub Pages Yuklovchi
echo ======================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [OGOHLANTIRISH] Git dasturi topilmadi.
    echo Brauzer orqali yuklash eng oson: github.com saytida yangi repo ochib,
    echo ushbu papkadagi hamma fayllarni "Upload files" orqali tashlang.
    echo.
    pause
    exit /b
)

echo 1. github.com saytida yangi repozitoriy oching (masalan: meros-international)
echo 2. Hosil bo'lgan repozitoriy havolasini nusxalang.
echo    Misol: https://github.com/foydalanuvchi_nomi/meros-international.git
echo.
set /p REPO_URL="Repozitoriy havolasini kiriting (URL): "

if "%REPO_URL%"=="" (
    echo [XATO] Havola kiritilmadi!
    pause
    exit /b
)

echo.
echo [1/5] Git repozitoriy boshlanmoqda...
git init

echo [2/5] Fayllar qo'shilmoqda...
git add .

echo [3/5] Commit qilinmoqda...
git commit -m "Meros International zamonaviy veb-sayt"

echo [4/5] Asosiy branch sozlanmoqda...
git branch -M main

echo [5/5] Masofaviy repozitoriy ulanmoqda va yuklanmoqda...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ======================================================
echo    Muvaffaqiyatli yuklandi!
echo    Endi GitHub repozitoriyingiz Settings -> Pages bo'limiga o'ting
echo    va "Branch: main" tanlab Save tugmasini bosing!
echo ======================================================
echo.
pause
