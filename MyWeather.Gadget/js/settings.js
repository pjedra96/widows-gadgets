document.onreadystatechange = function()
{    
    if (document.readyState=="complete")
    {
        location.value = System.Gadget.Settings.read("location");
    }
}

System.Gadget.onSettingsClosing = function(event)
{
    // Save the settings if the user clicked OK.
    if (event.closeAction == event.Action.commit) 
    {
        System.Gadget.Settings.write("location", location.value);
        // Get weather data
        weatherLoad(location.value);
    }
    // Allow the Settings dialog to close.
    event.cancel = false;
}