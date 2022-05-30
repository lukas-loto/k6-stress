# K6 Stress Test

** What do I need to run the load test with k6?

It is necessary to have k6 running on the local machine to test the operation.

For this you need to have a package installer installed on the machine, if you use Windows you can install [Chocolatey](https://chocolatey.org/install) and then install k6 with its help.

To do the Stress Test with k6 in GreenMainFrame it is necessary to run a git clone in a folder on the computer. 

# Testing the script

Open the Flows folder in the terminal and run the command k6 run <filename>, for example, k6 run auth.js to run the Stress Test of GreenMainFrame authentication

k6 run purchase.js to run the Stress Test of GreenMainFrame purchase process
  
The index.js file is just an example base file of how to run k6

# Manipulating the script

The flow is all ready, just change the values in this part of the code: stages: 
  
[
        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // around the breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
],
  

The duration is the time the script will take to put the number of VUs (virtual users) on the machine.

For example in the first two lines of the code above:
  
{ duration: '2m', target: 100 }, // below normal load
{ duration: '5m', target: 100 },

In up to 2 minutes we will have 100 VUs simultaneously running the application (website) and after 5 minutes have elapsed from the previous 2 minutes, we will continue with 100 VUs, that is, we will have 7 minutes with 100 VUs until we go to the next step which is to place 200 VUs simultaneously accessing the system.
  
The last code editing step is to change the access credentials to the corresponding procedures, for example in the line below:
  
response = http.post(
'https://auth-api.greenmainframe.dev/api/v1/auth/login',
'{"email":"lukas.domingos+91919@webera.com","password":"#Flamengo123"}',
{
  
in which we must change the field "email" and "password" with our correct credentials to access the GreenMainFrame system for proper access to the site, without any error.
  



