var observe;
var isDocked;

// Load the main modules and functions
function loadMain(){
    System.Gadget.onUndock = checkState;
    System.Gadget.onDock = checkState;
}


////////////////////////////////////////////////////////////////////////////////
//
// styles for gadget when UNDOCKED
//
////////////////////////////////////////////////////////////////////////////////
function undockedState()
{
    with (document.body.style)
    {
        width = "200px";
        height = "190px";
    }
    background.style.width = "200px";
    background.style.height = "190px";

    document.getElementById('notepad-area').classList.add('larger-pad');
    document.getElementById('notepad-area').classList.remove('smaller-pad');

    isDocked = false;
}
////////////////////////////////////////////////////////////////////////////////
//
// styles for gadget when DOCKED
// 
////////////////////////////////////////////////////////////////////////////////
function dockedState()
{
    with (document.body.style)
    {
        width = "160px";
        height = "150px";
    }
    background.style.width = "160px";
    background.style.height = "150px";

    document.getElementById('notepad-area').classList.remove('larger-pad');
    document.getElementById('notepad-area').classList.add('smaller-pad');
    
    isDocked = true;
}
////////////////////////////////////////////////////////////////////////////////
//
// determine if gadget is in sidebar - docked or on the desktop - undocked (resizing)
//
////////////////////////////////////////////////////////////////////////////////
function checkState()
{
    if (!System.Gadget.docked)
    {
        undockedState();
    }
    else
    {
        dockedState();
    }
}