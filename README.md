<img src="assets/Group.png" width="auto"/> 

# GateFold Music Blog 

## Description:
GateFold is a music blog centered around modern music, artists and albums within indie-rock, electronic and hiphop scenes, bringing you the latest news, gossip, reviews, tour dates, album releases and more. 

## Demo or Screenshots:


## Features:

### End-user
💿 Blog area displaying music blog posts previews in a sleek, dark design.

💿 Custom design cursor, scrollbar and containers for text 

💿 Top-carousel displaying the latest three posts 🔥

💿 Dropdown option to filter posts by your favorite music genre or sort posts in the order you prefer 

💿 Responsive interface supporting both desktop, mobile and tablet browsing

### Admin
💿 Admin panel with full CRUD-capability for blog entries utilizing noroff blog API 

💿 Create and update posts using the make and edit-pages, using multiple smart features like input validation to prevent incorrect URL's, image preview and character counter.  

💿 Secure API interaction using temporarily stored AUTH-token to validate actions. 

💿 Option to create new user or log in with a pre-existing one. 

## Technologies Used:
- HTML, CSS, JavaScript
- [Figma design](https://www.figma.com/design/brjnsB4QMoSfgiBs6dVDie/Exam-project---Blog?node-id=3-8&t=TAAwB2GnbIkI2WYo-1)
- [Noroff Blog API](https://docs.noroff.dev/docs/v2/blog/posts)
- [ChatGPT](https://chatgpt.com) (for generating blog posts)
- [Netlify](https://www.netlify.com) (For deploy of live page) 

## Installation:
👤 [User enviroment](blog-aksel.netlify.app)

🔐 [Admin enviroment](blog-aksel.netlify.app)

## Navigation and usage:

### End-user
- Click either direction arrow in the carousel to "rotate" the carousel that direction. Clicking the middle post will open it.
- Expand the "Filtering and sorting"-dropdown by clicking it. Select the order of sorting you prefer and/or click one of the genre categories to exclusively filter in corresponding articles
- Click on any preview card to open the article in full

### Admin
1. [Log in](https://blog-aksel.netlify.app/account/login.html) to the application with your "@stud.noroff.no"-pre-generated user, or [create a new one](https://blog-aksel.netlify.app/account/register)
2. Click "Create new post", fill in the appropriate fields and select "submit"
3. Click "blog list" for a full view of all created posts. Here you delete, modify or view any post from the user perspective.

## License:
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing:
This project is not open for direct contributions but is available for forking.

## Known Issues/Limitations:
- Security of page is limited due to API settings
- Only the admin (akshel87707@stud.noroff.no) can edit/delete/create posts due to endpoint hard coding.

## Future Improvements:
- Performance

## Changelog:
- v1.0: Current release

