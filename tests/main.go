package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

const apiKey = "49b5fe91ea43a79ce87eac61ec479b13"
const city = "minsk"
const units = "metric" // для температуры в градусах Цельсия

type WeatherResponse struct {
	Main struct {
		Temp     float64 `json:"temp"`
		Humidity float64 `json:"humidity"`
	} `json:"main"`
	Name string `json:"name"`
}

func main() {
	url := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=%s", city, apiKey, units)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: unable to get weather data")
		os.Exit(1)
	}

	var weatherResponse WeatherResponse
	err = json.NewDecoder(resp.Body).Decode(&weatherResponse)
	if err != nil {
		fmt.Println("Error decoding response:", err)
		os.Exit(1)
	}

	fmt.Printf("Current temperature in %s is %.2f°C, humidity %.f", weatherResponse.Name, weatherResponse.Main.Temp, weatherResponse.Main.Humidity)
}
