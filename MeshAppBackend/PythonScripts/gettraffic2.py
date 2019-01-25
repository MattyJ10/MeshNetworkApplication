# source :https://daanlenaerts.com/blog/2016/01/02/python-and-ssh-sending-commands-over-ssh-using-paramiko/
from paramiko import client
import sys
class ssh:
    client = None

    def __init__(self, address, username, password):
        #set the ssh client
        print("Connecting to server.")
        self.client = client.SSHClient()
        self.client.set_missing_host_key_policy(client.AutoAddPolicy())
        self.client.connect(address, username=username, password=password, look_for_keys=False)

    def sendCommand(self, command):
        print("running command \n")
        if(self.client):
            #retrieve sdtin, stdout, stderr from the command
            stdin, stdout, stderr = self.client.exec_command(command)
            while not stdout.channel.exit_status_ready():
                # Print data when available
                if stdout.channel.recv_ready():
                    #recieve the data
                    alldata = stdout.channel.recv(1024)
                    allerr = stderr.channel.recv(1024)
                    prevdata = b"1"
                    while prevdata:
                        #append the new data
                        prevdata = stdout.channel.recv(1024)
                        preverr = stderr.channel.recv(1024)
                        alldata += prevdata
                        alldata += preverr
                    #cast the data to a string and print it
                    print(str(alldata))
        else:
            print("Connection not opened.")
#connect
connection = ssh("172.27.0.90", "pi", "raspberry")
connection.sendCommand("echo 1")
connection.sendCommand("ifconfig")
connection.sendCommand("sudo python test2.py")
sys.stdout.flush()

