1. Basic setup

   a. database setup
   b. REST API for curd

   step1: npm init -y
   step2: install express, ejs and mangoose
   step3: set up express and start server in app.js ----------app.listen-------app.get--------nodemon app.js
   step4: establish connection with database-----require mongoose-----create main f(x)-------call main f(x)

2. Listing Model----doc moongoosejs.com

   Listing is basically a place in this project------airbnb

   basic info in any listing
   title----------------------string
   description ---------------String
   image-------------URL------String
   note: setting default URL for image: documentation mongoosejs.com+ schema + virutulas-----
   set: (v)=> v==="" ? "default value" : v,

   price----------------------Number
   location ------------------String
   country--------------------String

   step1: create a schema & model----listing.js in models folder and export to app.js
   step2: create a sample route /testListing
   using Listing model update a document
   save the doc

   step3: check in CMB
   show dbs
   use database_name
   show collections
   db.listings.find()--------check if sample data is inserted

3. Initilize database

   step1: create a folder init where we initilize everything
   step2: in init folder data.js store sample data
   step3: in init folder create index.js ----require mongoose------require data.js for data------require /listings.js for schmea
   step4: in index.js establish connection----delete exiting data--------insert data
   step5: in cmd go to index.js directory and run node index.js----------------------data was initilized

4. Index Route
   step1: create views folder with listings folder with index.ejs
   step2: in app.js-----require path-----set view engine and views path
   step3: with Restfull API create index route and render index.ejs and allListings
   step4: in index.ejs--show anchor tags directing to show route

5. Show Route-----Read operation
   step1: with restfull API we create /listing/:id
   step2: we extract id from req.params--------note://url encoded-------app.use(express.urlencoded({extended:true}));
   step3: we extract and save data using ID into listing
   step4: res.render()-----show.ejs and listing

   step5: In show.ejs we show data

   Note: check out in show.ejs for rupee symbol and , as per indian standards
   &#8377;
   <%= price.toLocaleString('en-IN') %>

6. New and Creat route-----Create operation

   GET------>/listing/new------>Form
                                 |
   POST<-------/listing<=========sumit

   step1: In index.ejs create a button under form and directed to /listing/new
   step2: in app.js -------restfull API for new route ---GET request---/listing/new---to render new.ejs
   step3: new route form submit
   step4: in app.js-------restfull API for create route--POST request--/listing
   step5: extrat data from req.body and save() to database

7. UPDATE (Edit and update route)

   EDIT---- GET------>/listing/new------>Form
   |
   UPDATE--POST<-------/listing<=========sumit

   step1: In show.ejs create an achore tag redirecting to edit page----/listing/:id/edit
   step2: restfull API -GET---to render edit.ejs and {listing}
   step3: in edit.ejs create a form with PUT request using mehtodoveride

   step4: install methodoveride
   step5: require methdo-override
   step6: app.use(methodoveride('_method))--------middleware

   step7: app.put request--------------extract id from req.params------use findByIdAndUpdate()-------redirect to /listings or show route

8. delete request

   step1: in show.ejs create a form with delete buttton------------use method overide ?\_method= delete
   step2: in app.js delete route extract id from req.params
   step3: use findByIdAndDelete()
   step4: redirect to /listings

//------------------------------------------------------------------------------------------------------------------

<!-- P45-phase 1b-->

1. Creating Boilerplate

   what is EJS Mate?
   It is a npm package helps to create boilerplate eg: every page we need navbar/footer so we can make a boilerplate and make use of it

   step1: install ejs-mate package---------in app.js---require ejs-mate and set ejs-mate
   step2: create a folder layouts in views where we create boilerplte.ejs to make use of
   step3: https://www.npmjs.com/package/ejs-mate -----in Boilerplate.ejs -----we use this code <%- body -%>
   step4: In index.ejs we use boilerplate for rest of code other than body-----by code--------<%('/layouts/boilerplate') -%>

   step5: for static files-----create public folder------css folder to place all .css files
   step6: in app.js--------set path for public folder---- express.static
   step7: in boilerplate.ejs----link style.css

2. Navbar

   step1: getbootstrap.com-------add basic css link and javascript link in boilerplate------check for font updated doc
   step2: copy bootstrap navbar copy and add to navbar.ejs file in includes folder-------------add code to boilerplate using includes
   step3: In navbar.ejs adjust code accordingly
   redirecting features of home-----All Listings------Add new listing
   Navbar icon using font-awesome---note: add font-awesome cdn link in boilerplate.ejs
   color of navbar icon using style.css
   sticking navbar on top
   border-botton class on navbar

   step4: Note: after creating Add new Listing feature in NAVBAR there is no need for New button so comment out

3. Footer
   step1: create footer.ejs
   step2: style acc to footer req
   step3: include footer.ejs in boilerplate

4. Styling Index
   step1: getbootstarp.com----------cards
   step2: add card in for loop in index.js---------add row and cols code----------add height and width of the image
   step3: In style.css for cards--------adjust img border and padding
   step4: From google fonts-------------jakarta sans---add code to body in style.css and in boilerplate-----<html> link

   step5: From getbootstrap.com------card------card-overlay <div class="card-img-overlay"> after img tag in index.ejs
   step6: Create card effect in style.css

5. Styling New Listing
   step1: add boilerplate.ejs using <% layout('./layouts/boilerplate') -%> to new.ejs
   step2: getbootstrap.com-----forms-----form label in <lable> and form control classes in <input>
   label and input in same div
   <label>------for + class
   <input>------class
   step3: add bootstrap css for button class= "btn btn-dark"
   step4: we are creating creating a div with class=row and another div with class=col=8 offset-2 so we can accomidate everything in one place

   step5: we would like to accomidate price and country in same row-------so NEW div and class=row
   we can adjust row to col ratio for md- medium screen and lager screen----class = col-md-4 and 8 in price and country

   step6: In order to keep the footer sticky to bottom
   in style.css under body{
   we are making display: flex ; flex-direction: coloume; and height of body as 100%vh so footer will be at botom
   }
   .container{flex: 1};--------------so it grows to fill the space and push the footer down

6. Styling edit Listing
   step1: add boilerplate.ejs using <% layout('./layouts/boilerplate') -%> to edit.ejs
   step2: simalr to new styling above
   step3: div----class=row and sub div with class coll

   step4: div for each DIV for each input with label and class from bootstrap
   stpe5: Btn sytling for edit button

7. Styling Show Listing
   step1: add boilerplate code to adopt features of boilerplate.ejs
   step2: make use of cards from bootstrap.com
   step3: use classes row and col and offset to arrange data in card

   step4: edit and delete buttons----------display flex and classes col
   step5: set padding of card to 0 so things will be aligned


BS-46-Middlewares
BS-47-Errors
//------------------------------------------------------------------------------------------------------------------

<!-- P48-phase 1c -->

1.  Client side validation (form)
    When we enter data in the form, the browser or the webserver will check to see if the data is in correct formate and with in the constraints set by the application

    Validattion 2 types----
    CLIENT SIDE-----front end to backend (forms)-----for this we use form validation
    SERVR SIDE------db(schema)/error handling--------@production eg: error during adding new data

    eg: for Client side validation---to create new----even if we submit incomplete details---it gets update with incomplete data
    So form validation comes into play and ensures every details is metioned

    step1: in new.js-----set input of TITLE, DESCRIPTION, PRICE, COUNTRY, LOCATION to required------avoid incomplete submission
    for image we have a default value---so we are not marking as required

           Now we have applied brower settings for form but better way in addition to browser is to use bootstrap

    step2:

    1. open getbootstrap.com-----forms----validation ----ref doc
       novalidation -----add keyword in form
       needs-validation--add class in the form
    2. add js code to boinerplate/rew.ejs using <script>tag --hepls in form svalidation ----public---JS----script.js

2.  Success or Failure Text---new.ejs

    To show success/failure text, we need to add classes |valid-feedback and invalid-feedback| <:::> after input feild
    <div class="valid-feedback">
    Looks good!
    </div>

    <div class="invalid-feedback">
    Please provide a valid city.
    </div>

3. Custom Error Handling---Serverside error handling

    step1: use middelware
    step2: use try and catch--with next


4. Add wrapAsync-----Better way of handling async functions errors

    step1: create a folder utiles and wrapAsync.js in it----code wrapAsync code and exprot
    step2: import in app.js
    step3: update changes to async functions----edit route---throw err and check if error-handler is working

    By doing so we are helping server to run irrespective of errors

5. Add ExpressErrror----to custom responses for different errors

    step1: create a file ExpressError.js in utils ----code ExpressError class and export the same
    step2: require code in app.js
    step3: error-handler  we can extract statusCode and message from err and sent in response  \\ app.use() error handler

    step4: in edit route- throw a custom error using ExpressError and see if it reflecting error handler
    Note: in case of few error without stautus code error-handler may not be invoked and result in server crash---so it's better to set default statusCode and message in error-handler

    step5: Page not found error-------

    app.all("*", )----NOT WORKING 
    app.use('/' (callback){
        res.render(err.ejs,{err obj(PAGE NOT FOUND)});
    })

6. error.ejs---TO showcase errors in a better fashion way
    step1: create errors.ejs
    step2: in app.js in error res.render err.ejs
    step3: In bootstrap.com ---use alerts styling
    
7. Validation for Schema
   note: In new route  if listing is not found we are throwing error

   similarly we do for each field

   const newListing = new Listing(req.body.listing)
   if(!newListing.title){
      throw new ExpressError(400,"Listing title is missing");
   }

   //similarly for rest of the feilds
   Note: what if condition does for each will be acheived by joi.dev----npm package
   step1: install joi
   step2: require joi
   step3: With the help of joi we define Schema for validation---Note: This validation is not for moongoose, it is server side validation schema

   step4: install joi npm package
   step5: create a file joiSchema----require  and code joi schema and export
   step6: in app.js require ListingSchema
   step7: in create route: 

       //joiSchema validation
    let result= ListingSchema.validate(req.body);
    console.log(result);

    helps to validate schmea from server side and in result if there is any error it is displayed----Server is not crashed

8. Validation for Schema(Middleware)

   step1: creating function 
   step2: passing the function as middelware---first validates schema and execute the code update route and create route

   BS-49 DatabaseReationships



   




