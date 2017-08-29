FROM microsoft/dotnet
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs build-essential
WORKDIR /app
COPY ng-ssr.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out
EXPOSE 80
ENV ASPNETCORE_URLS http://+:80
ENV ASPNETCORE_ENVIRONMENT Production
ENTRYPOINT ["dotnet", "out/ng-ssr.dll"]