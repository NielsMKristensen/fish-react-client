# Fish-React-Client

## Put & Take Heaven, project #3 Full-stack Web Application. 

The 3rd and the final project is a single-page Web application using the MERN stack (MongoDB, Express, React & Node.js).

Put & Take Heaven is a single- page Web application build to help Put & Take lake owners to promote their lakes and giving the Angler an detailed overview of available lakes and the possibility to purchase fishing permit.

## Wireframes
Please look at the wireframes.drawio in the repository.

## Technologies
-	react
-   react-bootstrap
-	bootstrap
-	ES6
-	Axios
-   cloudinary-react
-   react-bootstrap

## Components and Pages structure
     {/* Navbar component rendering the page navigation */}
     <Fishnavbar />

     <Routes>
     {/* Start page builds list of lakes based on LakeCard component */}
     <Route path="/" element={ <LakeList /> } />
     
     {/* Create Lake page only available if isLakeOwner component returns true */}
     <Route path="/CreateLake" element={<IsLakeOwner><CreateLake /></IsLakeOwner>} />
     
      {/* renders LakeDetails,  only available if IsPrivate component returns true */}
     <Route path="/lake/:_id" element={<IsPrivate><LakeDetails /></IsPrivate>} />
     
     {/* Edit Lake page only available if isLakeOwner component returns true */}
     <Route path="/lake/edit/:_id" element={<IsLakeOwner><EditLake /></IsLakeOwner> } />
     
     {/* creates a permit,  only available if IsPrivate component returns true */}
     <Route path="/orderpermit" element={<IsPrivate><OrderPermit /></IsPrivate>} />
     
     {/* error route for non owners */}
     <Route path="/NotOwner" element={<NotOwner />} />

     {/* creates a user,  only available if IsAnon component returns true */}
     <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>}/>

     {/* Login,  only available if IsAnon component returns true */}
     <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
     
     </Routes>

## Project Link
https://fish-client.netlify.app/


## Future Work
-  Change the URL name of the server.
-  User routes for user administration
-  Permit routes for permit administration
-  Google maps integration
-  Picture library integration
-  Payment via credit card integration

## Resources
- ironhack portal and previous labs.
- THE internet
### Special mentions
 - https://react-bootstrap.github.io/
 - https://www.npmjs.com/
 - https://cloudinary.com/

## Team Put & Take Heaven
 - Niels M. Kristensen
