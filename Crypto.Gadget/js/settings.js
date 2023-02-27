document.onreadystatechange = function()
{    
    if (document.readyState=="complete")
    {
        currency.value = System.Gadget.Settings.read("currency");
    }        
}

System.Gadget.onSettingsClosing = function(event)
{
    // Save the settings if the user clicked OK.
    if (event.closeAction == event.Action.commit) 
    {
        System.Gadget.Settings.write("currency", currency.options[currency.selectedIndex].value);
    }
    // Allow the Settings dialog to close.
    event.cancel = false;
} 
