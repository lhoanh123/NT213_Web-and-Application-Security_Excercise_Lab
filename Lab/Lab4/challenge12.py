import frida
import time

# Get the USB device
device = frida.get_usb_device()

# Spawn the target application
pid = device.spawn(["com.revo.evabs"])

# Resume the application
device.resume(pid)
time.sleep(1)  # Sleep for 1 second to avoid crashing

# Attach to the application
session = device.attach(pid)

# Define the hook script
hook_script = """
Java.perform(function () {
    send("[-] Starting hooks java.util.Random.nextInt");
    var random = Java.use("java.util.Random");
    random.nextInt.overload("int").implementation = function(var_1) {
        return -200;
    };
});
"""

# Create and load the script
script = session.create_script(hook_script)
script.load()

input('Press any key to continue...')  # Prevent script termination