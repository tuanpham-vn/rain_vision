import os
from PIL import Image

# Thư mục chứa các file TIF
folder_path = "rainsat"

# Lặp qua tất cả các file trong thư mục
for filename in os.listdir(folder_path):
    if filename.endswith(".tif") or filename.endswith(".tiff"):
        # Đường dẫn đầy đủ của file TIF
        tif_path = os.path.join(folder_path, filename)

        # Đường dẫn file PNG (cùng tên nhưng đuôi .png)
        png_path = os.path.join(folder_path, os.path.splitext(filename)[0] + ".png")

        # Mở và chuyển đổi file TIF sang PNG
        with Image.open(tif_path) as img:
            img.save(png_path, "PNG")
            print(f"Đã chuyển đổi: {filename} -> {os.path.basename(png_path)}")

print("Hoàn tất chuyển đổi toàn bộ file TIF sang PNG.")