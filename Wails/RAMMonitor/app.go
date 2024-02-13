package main

import (
	"context"
	"encoding/json"
	"os"
)

// App struct
type App struct {
	ctx    context.Context
	width  int
	height int
}

// Struct de window Size
type WindowSize struct {
	Width  int `json:"width"`
	Height int `json:"height"`
}

type RamInfo struct {
	TotalRAM uint64 `json:"totalRAM"`
	FreeRAM  uint64 `json:"freeRAM"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	//Inicializo aqui las dimensiones de la pantalla
	return &App{width: 400, height: 600}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// funcion para obtener las dimensiones de la pantalla
func (a *App) GetWindowSize() (WindowSize, error) {
	size := WindowSize{
		Width:  a.width,
		Height: a.height,
	}
	return size, nil
}

func (a *App) ReadRamInfo() (RamInfo, error) {
	var ramInfo RamInfo
	data, err := os.ReadFile("/proc/testproc")
	if err != nil {
		return ramInfo, err
	}
	err = json.Unmarshal(data, &ramInfo)
	if err != nil {
		return ramInfo, err
	}
	return ramInfo, nil
}
