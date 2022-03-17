package main

import (
	"fmt"

	uiextensionsgo "github.com/DataDog/apps/packages/ui-extensions-go"
)

const templateVariableName = "variable-1"

func handler(client *uiextensionsgo.Client) func(uiextensionsgo.DashboardCogMenuClickData) {
	return func(data uiextensionsgo.DashboardCogMenuClickData) {
		var templateVariable string
		var found bool
		for _, variable := range data.Dashboard.TemplateVars {
			if variable.Name == templateVariableName {
				found = true
				templateVariable = variable.Value
				break
			}
		}

		if !found {
			/**
			 * We couldn't find the template variable we were looking for,
			 * so we bail.
			 */
			return
		}

		/**
		 * We're showing that we can actually call back out to JS with data from go.
		 *
		 * In this case, we send a notification of whatever the template variable value is.
		 */
		message := fmt.Sprintf("Received the template variable: %s\n", templateVariable)
		notification := uiextensionsgo.NotificationDefinition{
			Label: message,
			Level: "success",
		}
		client.Notify(notification)
	}
}

func main() {
	/**
	 * This should be enough to initialize the client and respond to the handshake,
	 * but it doesn't seem to be enough.
	 * We still need to have a call to `DD_SDK.init()` in JS.
	 */
	client := uiextensionsgo.Init()
	client.OnDashboardCogMenuClick(handler(client))

	/**
	 * Block so the program doesn't end.
	 */
	<-make(chan struct{})
}
