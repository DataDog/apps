package uiextensionsgo

import (
	"encoding/json"
	"fmt"
	"syscall/js"
)

type Client struct {
	js.Value
}

func Init() *Client {
	sdk := js.Global().Get("DD_SDK")
	client := sdk.Call("init")
	return &Client{
		client,
	}
}

type DashboardCogMenuClickData struct {
	Dashboard DashboardContext `json:"dashboard"`
	MenuItem  MenuItemContext  `json:"menuItem"`
}

type DashboardContext struct {
	Id           string                  `json:"id"`
	ShareURL     string                  `json:"shareURL"`
	TemplateVars []TemplateVariableValue `json:"templateVars"`
}

type MenuItemContext struct {
	Key string `json:"key"`
}

type NotificationDefinition struct {
	Label string `json:"label"`
	Level string `json:"level"`
}

type TemplateVariableValue struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

func (client *Client) Notify(definition NotificationDefinition) {
	jsonBytes, err := json.Marshal(definition)
	if err != nil {
		fmt.Printf("Unabled to serialize as JSON, error: %+v\n", err)
		return
	}

	jsonString := js.ValueOf(string(jsonBytes))
	notification := js.Global().Get("JSON").Call("parse", jsonString)
	client.Get("notification").Call("send", (notification))
}

func (client *Client) OnDashboardCogMenuClick(handler func(DashboardCogMenuClickData)) {
	client.Call("on", "dashboard_cog_menu_click", js.FuncOf(func(_ js.Value, args []js.Value) interface{} {
		if len(args) < 1 {
			fmt.Printf("Expected at least one argument, received: %+v\n", args)
			return nil
		}

		eventData := args[0]
		dashboardCogMenuClickData := &DashboardCogMenuClickData{}
		jsonString := js.Global().Get("JSON").Call("stringify", eventData).String()
		raw := []byte(jsonString)

		err := json.Unmarshal(raw, dashboardCogMenuClickData)
		if err != nil {
			fmt.Printf("Incorrect data received from SDK, received: %s\nerror: %+v\n", raw, err)
			return nil
		}

		handler(*dashboardCogMenuClickData)

		return nil
	}))
}
