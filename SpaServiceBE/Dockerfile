# Sử dụng SDK để build ứng dụng
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Copy file solution và project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Sao chép solution và các project file
COPY ["SpaServiceBE.sln", "./"]
COPY ["SpaServiceBE/SpaServiceBE.csproj", "SpaServiceBE/"]
COPY ["Repositories/Repositories.csproj", "Repositories/"]
COPY ["Services/Services.csproj", "Services/"]

# Khôi phục dependencies
RUN dotnet restore "SpaServiceBE.sln"

# Copy toàn bộ source code
COPY . .

# Build ứng dụng
WORKDIR "/src/SpaServiceBE"
RUN dotnet publish "SpaServiceBE.csproj" -c Release -o /app/publish

# Chạy ứng dụng
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SpaServiceBE.dll"]
