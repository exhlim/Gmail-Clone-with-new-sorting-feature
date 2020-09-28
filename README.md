# Gmail Clone/Mail Retriever with sorting feature

## About ##

Hosted [here](https://gmail-clone-crux.herokuapp.com/) on heroku. Register a new account to access the project. (Preview below)

## Motivation ##

Main motivation for this project revolves around trying to sort emails before their being read, based on the keywords present in the email itself. The overall UI is primarily focused on lowering the barrier of entry when sorting your emails. I have decided on using Gmail as a reference and to challenge myself with Gmail's RESTful API's.

## What is Crux? ##

Crux is the name of the feature implemented in this project to sort emails. It primarily uses keywords which the user defines to help sort emails into their respective tabs. Keywords are matched with the contents of the emails and when a match is found, those emails will be rendered under that specific tab.

One key difference between CRUX and Gmail's keyword sorting is that the Gmail feature requires **all** of the defined keywords to be present in the email itself. On the other hand, CRUX works around that and if the email itself contains any one of the keywords, the email will be sorted into the assigned tab.

Keywords can be defined on the left side bar of the mail main page, separated by a new line. 
Example (You are working on a project called Swift and want all emails pertaining to this project to be under this tab):

Defining your Crux:

- New Tab name:
  - Swift
  
- Keywords:
  - Project Swift 
  - Swift 

Now all emails that contain the words "Project Swift" and "Swift" (case insensitive) in the future and the past will be sorted into this new Tab! By default, an Urgent tab already exists which filters all emails containing the words "Urgent" and "Urgently".

When defining your keywords, be specific and more importantly, ask yourself:

What is the Crux of my emails?

## Features ##

1. Website register/login
2. Google account linking/authentication
3. Default Urgent Tab
4. Defining up to 3 Crux
5. Viewing of emails in primary inbox
6. Logout

## Preview ##

### Google Authentication signing in ###
![](./public/gif1.gif)

### CRUX Feature ###
1. Shows the default urgent tab
2. Creating a tab name "Sort 1" with the keywords defined as "Google, Project Monster, Monster" to seive out the emails
![](./public/gif2.gif)

## Use Cases ##

Human and machine integration. It is possible to set the machine (feature) up for success through minor alterations by the user such as adding the keywords in one of the email threads and coloring it the background color. 

For users that don't really sort their emails, this feature is a small step towards that direction through very easily defining a tab name and approximately 2 - 3 keywords. 

Users that are working on multiple project with multiple people where emails from one sender may not always be referring to the same project. 


## Side Notes ##

Emails are rendered after authorization. For security reasons emails that have already been rendered in the past are NOT saved into any database. They are taken from Gmail API then stored in a global variable and rendered directly. Once you click on the log out button on the top right of the mail main page, all values of global variables are set back to being empty.

This feature is not a replacement for existing sorting features such as labels and rules. It is more of an add-on to enhance user experiences.

If you have any suggestions do let me know!

## Credits ##

Developers: exhlim (Eugene Lim) © 2020