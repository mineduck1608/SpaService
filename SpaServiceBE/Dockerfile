# Sử dụng .NET SDK để build ứng dụng
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy tất cả file vào container
COPY . .

# Restore các package
RUN dotnet restore

# Build ứng dụng
RUN dotnet publish -c Release -o out

# Sử dụng image runtime nhẹ hơn để chạy ứng dụng
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy ứng dụng đã build từ bước trước
COPY --from=build /app/out .

# Chạy ứng dụng
ENTRYPOINT ["dotnet", "SpaServiceBE.dll"]
