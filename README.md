# Gmail Clone/Mail Retriever with sorting feature

---

### Motivation ###

Main motivation for this project revolves around trying to sort emails before their being read, based on its content. Decided on using Gmail as a reference and to challenge myself with Gmails RESTful API's.

### What is Crux? ###

Crux is the name of the feature implemented in this project to sort emails. It primarily uses keywords which the user defines to help sort emails into their respective tabs. Keywords are matched with the contents of the emails and when a match is found, those emails will be rendered under that specific tab.

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

### Features ###

1. Website register/login
2. Google account linking/authentication
3. Default Urgent Tab
4. Defining up to 3 Crux
5. Viewing of emails in primary inbox
6. Logout

### Use Cases ###

Human and machine integration. It is possible to set the machine (feature) up for success through minor alterations by the user such as adding the keywords in one of the email threads and coloring it the background color. 

For users that don't really sort their emails, this feature is a small step towards that direction through very easily defining a tab name and approximately 2 - 3 keywords. 

Users that are working on multiple project with multiple people where emails from one sender may not always be referring to the same project. 


### Side note ###

Emails are rendered after authorization. For security reasons emails that have already been rendered in the past are NOT saved into any database. They are taken from Gmail API then stored in a global variable and rendered directly. Once you click on the log out button on the top right of the mail main page, all values of global variables are set back to being empty.

This feature is not a replacement for existing sorting features such as labels and rules. It is more of an add-on to enhance user experiences especially for those that are receiving gigabytes of emails every year.

There seems to be a limit/quota to some of the API calls. Hence, I'm setting the number of messages by the get request to 5. Anymore more and I'll receive the 413 error where payload is too large. Nonetheless, it seems like if the emails that you are getting from the API's are very basic (E.g Just a couple of paragraphs of normal text) you would be able to receive slightly more.
https://developers.google.com/gmail/api/reference/quota