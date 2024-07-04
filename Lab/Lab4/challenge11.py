import frida
import sys 

# Get the USB device
device = frida.get_usb_device()

# Spawn the target application
pid = device.spawn("com.revo.evabs")

# Attach to the application
session = device.attach(pid)

# Define the hook script
hook_script = """
Java.perform(function () { 
    send("[*] Starting hooks android.content.Intent.putExtra"); 
    var intent = Java.use("android.content.Intent"); 
    intent.putExtra.overload("java.lang.String", 
"java.lang.String").implementation = function(var_1, var_2) { 
        send("[+] Flag: " + var_2); 
    }; 
}); 
"""
# print the message 
def printGetInfor(message, data): 
    print(message) 

# Create the script and load it
script = session.create_script(hook_script)

# add the message handler to print the message 
script.on("message", printGetInfor)

script.load()

# Resume the application
device.resume(pid)

# keep the script running to read the result 
sys.stdin.read()