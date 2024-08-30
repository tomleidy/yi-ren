**Yi-Ren: An Online Yijing Reader and Interpreter**

**Objective**  
	This application will allow people to explore the wisdom of the Book of Changes and, imperfectly, divine what’s going on in their lives. To create a website that allows people to do interactive Yijing readings through the world wide web or their phone.

**Background**  
	In the world of divination, there are three main paths that people pursue: Runes, Tarot/Oracle cards, and the Yijing. There have been Yijing oracle cards, and attempts by occultists to pair the meanings of tarot cards with those of the Yijing. These attempts have been superficial at best, given the potential combinations available for an Yijing reading.  
	Each Yijing reading is performed through flipping of three coins per line. Heads values are counted as 3 and tails values are counted as 2\. The values are then summed, giving a range of 6-9. The values of 6 and 8 are considered Yin lines (broken), with the 6 having a moving aspect (i.e., turning into a Yang line), and 7 and 9 are Yang lines (solid), with 9 being the moving value. (Tangent: In Chinese medicine, the Yang organs are the hollow ones, and the Yin organs are the solid ones).  
	In most print sources, the method of looking up the hexagram is to take the lower three lines (lower trigram) and the upper three lines (upper trigram) and look them up on an 8x8 table.  
	Confucius, in his Analects, said "If some years were added to my life, I would give fifty to the study of the Yi, and then I might come to be without great faults," (https://ctext.org/analects/shu-er, 17, accessed 8/20/2024) though according to Wikipedia he considered it "a source of wisdom first and an imperfect divination text second." (https://en.wikipedia.org/wiki/I\_Ching, accessed 8/20/2024)  
	In terms of scale, at 4 possibilities for each line, with 6 lines per hexagram, that’s a total of 4^6 or 4,096 possible combinations per reading, with more information to be . Reading the Yijing can be done via memory, but most people start out with reference materials. The author of this proposal uses a combination of 4 different sources depending on their curiosity and desire for deeper information. Each one has its own unique inflection to the translation, and there was a definitive ramping up in understanding before using the third and fourth texts. They still consider themself an amateur at this, and will probably do so until they die.  
	This application will allow people to explore the wisdom of the Change and, imperfectly, divine what’s going on in their lives.  
	The name is a play on words, inspired by the Chinese herb Yi Yi Ren, or in Chinese, "薏苡仁," and a common name in English is Job’s tears (Bensky). Combining the change ("易") of "易经" with  person ("人"), which, cosmologically, occurs between Heaven and Earth.  
	Extant online examples are, in order of DuckDuckGo listing:

1. [https://www.eclecticenergies.com/iching/virtualcoins](https://www.eclecticenergies.com/iching/virtualcoins)  
2. [https://ichingonline.net/](https://ichingonline.net/)  
3. [https://yijing.website/](https://yijing.website/)

	The author of this document has extensively used the first site for "flipping coins" digitally, and looking up the resulting hexagrams in their personal reference repository.

**Scope \- Features**  
	The primary features of this application will be:

* "coin flipping"  
* Display of the primary resulting hexagram  
* If moving lines, display of the secondary resulting hexagram  
* Interpretation as provided by a public domain translation of the Yijing (Legge) for the relevant hexagrams and lines  
* User login/authentication and registration

	Supplemental features:

* reading history  
* yarrow stalk readings  
* offline support  
* addition of your own personal meanings/interpretations.   
* the ability to download an archive  
  * reading histories  
  * personal meanings/interpretations
* administrator pages
	* users listing and editing
	* listing of readings

	The free/basic service will be only:

* coin based readings  
* public domain reference material  
* online readings only  
* an annual saved reading (on their birthday\!), which will require registration

The paid / SaaS version will have the option for:

* digital yarrow stalk readings  
* quick/single-click readings  
* offline support  
* reading history  
* personal meanings/interpretations  
* archive download  
* payment processing

	This application will not be used for professional readings, storing of clients, differentiating clients and readers, or logging Yijing readings for multiple users. This is geared toward personal use and personal use only.   
	Authentication will be per user, and use local username/password pairs. User profiles will be available for viewing, but limited information will be displayed by default.  
UI will be given dark mode / light mode preferences based on CSS Properties allowing for user system determination of which view they want.

**Scope \- Technical Approach**  
This will be implemented in a combination of JavaScript, React, Redux, Node.js and Express with MongoDB and Mongoose for database purposes. HTML and CSS are foregone conclusions from the previous technologies.

**Scope \- Architecture**  
	Databases

* Users  
  * User\_id  
  * Usernames  
  * Email addresses  
  * Password (hashed)  
  * OAuth  
  * Birthday (only allow person to change twice through UI, else contact)  
  * Timestamp of registration  
  * Timestamp of modification  
  * SaaS\_date (timestamp)  
  * SaaS\_duration (integer, months)  
* Personal Meanings/Interpretations  
  * User\_id  
* Readings  
  * User\_id  
  * Timestamp of reading  
  * Timestamp of last modification  
    * if deleted and \>30 days ago, perm\_delete  
  * Topic (can be empty string, can be updated)  
    * Previous topics kept in list (invisible to user)  
      * Pruned after a year?  
  * User notes / summary / thoughts (can be edited)  
    * Previous notes kept in list (invisible to user)  
      * Pruned after a year?  
  * Hexagram 1 (1-64)  
  * Hexagram 2 (can be empty, otherwise integer 1-64)  
  * Deleted (boolean)  
  * Perm\_deleted  
    * boolean  
    * reading cannot be seen or modified by user once true

  * Hidden (boolean)

	Front End

* New Reading  
  * Coin flipping / yarrow stalk / single-click reading  
  * SaaS: topic  
* Previous Readings List (SaaS)  
  * List old readings in reverse chronological order  
    * Date, time, topic  
  * Show/hide hidden option (requires fresh authentication to show–PIN?)  
  * If show all and post hidden, show button  
  * If post shown, hide button  
  * Delete button, confirmation dialog  
  * Checkboxes for selecting/mass editing  
    * If show all, Select all button  
    * If unshown posts, Select all shown button  
  * Topic filter  
* Previous Reading  
* View Reading  
  * Time/date  
  * Hexagram 1  
  * If Hexagram 2,  
    * Moving lines in middle  
    * Hexagram 2 on right  
  * Meaning \- Public domain (Legge)  
    * Collapsed if SaaS and personal meaning reference  
  * If SaaS  
    * Topic  
    * Personal meaning reference  
    * Hidden checkbox  
    * Delete checkbox  
    * User notes/interpretation for specific reading  
    * If changes made,  
      * Save changes  
      * Reset  
* Deleted list

Back-End

* POST  
  * /newreading/  
    * application/json  
    * Valid JSON: {“hex1”: 1-64, “hex2”: 0-64}  
    * if authenticated and SaaS  
      * adds to reading database  
      * redirects to /reading/:readingId  
      * loads personal data  
    * free? redirects to /gua/:hex1/:hex2  
* GET  
  * /gua/:hex1/  
    * returns hexagram 1 information/reading  
  * /gua/:hex1/:hex2  
    * returns hexagram 1 and 2 information (including all moving lines)  
  * SaaS / authenticated only  
    * /reading/:readingId  
      * 403 if incorrect user\_id, redirect to page offering to log them out  
    * /readings/  
      * list of readings by user\_id  
* PUT  
  * Authenticated SaaS only  
  * /reading/:readingId  
    * application/json  
    * Valid JSON: { “reading\_id”: int, “topic”: topic, “notes”: user\_notes, “deleted”: boolean, “hidden”: boolean }  
    * User\_id determined from authentication  
* DELETE  
  * authenticated SaaS only  
  * /reading/:readingId

**Timeline/Milestones**  
*Phase 1*

* Implementation of  
  * free/basic user end-points  
    * incl. testing suite with basic JSON responses  
  * users database  
  * user registration and authentication, login, and logout  
  * readings database for SaaS  
* Estimated time: 2 weeks

*Phase 2*

* Implementation of  
  * front end for basic users  
  * public domain Yijing to database/results  
* Estimated time: 2 weeks

*Phase 3*

* Implementation of  
  * /reading/ endpoints for SaaS users  
  * /readings/
*Phase 4*
* Implementation of
	* administrator console

**Future Improvements**  
	Implementation of payment processing and text advertising for basic users. Administrator accounts?

**Resources**

- Software:  
  - VS Code, Git/GitHub  
  - MERN stack  
  - Docker  
  - Postman or Insomnia for testing  
- Hardware:  
  - Testing and developing locally on extant headless Linux server  
- External Help: See Future Improvements

**Evaluation Criteria**  
	This is a personal project, and as such will be determined successful if it can successfully and easily be hosted on remote machines after being developed locally.  
If it then goes on to be a useful web application, with a sufficient number of users to pay for itself, then it has exceeded expectations.

**Conclusion**  
	This project is designed to appeal to people interested in Chinese medicine and/or occultism, particularly as it relates to divination and wisdom.
