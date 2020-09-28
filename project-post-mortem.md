## Project 2 Post Mortem

#### Approach and Process

1. What in my process and approach to this project would I do differently next time?
 - Should have started with Gmail API segment first as it was the biggest hurdle. 

1. What in my process and approach to this project went well that I would repeat next time?
 - 
--

#### Code and Code Design

1. What in my code and program design in the project would I do differently next time?
 - ` </section>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js"></script>
            <script type="text/javascript" src="./public/main.js"></script>
            <script async defer src="https://apis.google.com/js/api.js"
            onload="this.onload=function(){};handleClientLoad()"
            onreadystatechange="if (this.readyState === 'complete') this.onload()">
            </script>`
    Trying to convert some of the Gmail API code into JSX rather than leaving it as html.

1. What in my code and program design in the project went well? Is there anything I would do the same next time?
 - Don't think that there is something that went exceptionally well but if i had to pick something it would be the formating of my code.
 `values.forEach((email,index) => {
                var date, rawDates, snippet, subject, sender, receiver, content
                email.result.payload.headers.forEach(object=> {
                    if(object.name == 'From') {
                        sender = object.value.split("<")[0]
                    }
                    if(object.name == "Subject") {
                        subject = object.value
                    }
                    if(object.name == "Delivered-To") {
                        receiver = object.value
                    }
                })
                date = getDate(email.result.internalDate);
                rawDates = email.result.internalDate;
                snippet = email.result.snippet;
                mailid = email.result.id
                if(email.result.payload.parts === undefined) {
                    content = atob(email.result.payload.body.data.replace(/-/g, '+').replace(/_/g, '/') );
                } else if(email.result.payload.parts[1] === undefined){
                    content = atob( email.result.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/') );
                } else {
                    content = atob( email.result.payload.parts[1].body.data.replace(/-/g, '+').replace(/_/g, '/') );
                }
                // content = decodeBase64(email.result.payload.parts[0].body.data);
                body.push({
                    mailid: mailid,
                    sender: sender,
                    subject: subject,
                    snippet: snippet,
                    content: content,
                    date: date,
                    rawDate: rawDates,
                    receiver: receiver
                })
            })`

#### WDI Unit 1 Post Mortem
1. What habits did I use during this unit that helped me?
 - Having abit more confidence in myself when writing code and visualizing the flow so that i spend lesser time console logging.

2. What habits did I have during this unit that I can improve on?
 - Spend more time reading up on information online (E.g Gmail API) before i start.

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)
 - Good pace!