package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

const apiKey = "OPEN_WEATHER_API_KEY"

var city string = "minsk"

const units = "metric"

type WeatherResponse struct {
	Weather []struct {
		Main string `json:"main"`
	} `json:"weather"`
	Main struct {
		Temp     float64 `json:"temp"`
		Feels    float64 `json:"feels_like"`
		Humidity float64 `json:"humidity"`
		Pressure float64 `json:"pressure"`
	} `json:"main"`
	Wind struct {
		Speed float64 `json:"speed"`
	} `json:"wind"`
	Name string `json:"name"`
}

func changeCity(w http.ResponseWriter, r *http.Request) {
	// Handle preflight request for CORS
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	fmt.Println("changecityFunc")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var data map[string]string
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "err", http.StatusBadRequest)
		fmt.Println("changecityFunc2")
		return
	}
	fmt.Println("changecityFunc3")
	if newCity, ok := data["City"]; ok {
		city = newCity
		w.WriteHeader(http.StatusOK)
		fmt.Println("changecityFunc4")
	} else {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		fmt.Println("changecityFunc5")
	}
	fmt.Println("changecityFunc6")
}

func getWeatherData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	url := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=%s", city, apiKey, units)

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Error fetching weather data", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, "Error: unable to get weather data", http.StatusInternalServerError)
		return
	}

	var weatherResponse WeatherResponse
	err = json.NewDecoder(resp.Body).Decode(&weatherResponse)
	if err != nil {
		http.Error(w, "Error decoding response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(weatherResponse)
}

func main() {
	http.HandleFunc("/weather", getWeatherData)
	http.HandleFunc("/setCity", changeCity)
	fmt.Println("Server is listening on port 8080")
	http.ListenAndServe(":8080", nil)
}
