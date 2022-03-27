# Is this a Pidgeon?

## Info

Made by Eric Lie for RFP2202 - FiJ.

## Prompt

You will be creating a full-stack application that takes in image urls and analyzes them to determine whether or not they are pictures of pidgeons.

You **DO NOT** need to complete this test to be considered ready for the TA. (I also don't know what the TA is going to be, so completing this test isn't quite proof of being ready either).

***ONLY USE*** authorized resources while taking this test. (Official documentation, stack overflow). **DO NOT** reference old code or share test information while taking it for the first time!

Be sure to commit often! Good luck!

### ***BEFORE STARTING***

Navigate to this test's root directory and run `npm install`.
Launch mysql service, and seed the database by running the schema.sql file included with this repo.
Run `npm run build` to run webpack.
Run `npm run server` to run the server.

You should be able to see the starter web page.

## You can't run tests unless the machine learning model has loaded into the browser! Check the model load state under the navbar title to check this status.

### Many sites don't apply CORs headers to their images. Imgur is a good exception to this, and some sample images are below.

Pidgeons: (The classification model may or may not classify these correctly)
- https://i.imgur.com/lHWTPUq.jpeg
- https://i.imgur.com/ZVJCqZp.jpeg
- https://i.imgur.com/KG57apZ.jpeg
- https://i.imgur.com/9RwclZ2.jpeg

Not a Pidgeon:
- https://i.imgur.com/yWzmOj1.png
- https://i.imgur.com/gSMbCEt.png


### Level 1
### Load Prediction Data

- [x] - Refactor the `IsPidgeon` component to accept an image url. The image URL should automatically fill the `<img>` tag and the image should appear on the page when a URL is entered.
- [x] - Add functionality to the `IsPidgeon` component that will tell the user whether a given image is or is not a pidgeon using the output from the `isPidgeonTest` function that is provided.
- [] - Create a list in the `BirdList` component that dynamically renders images that have been tested. (Use the data from sampleData.js for now).
- [] - Allow users to switch between the two views using the `Show me my Birds` and `Is this a Pidgeon?` buttons in the navbar:
  - [] - `Pidgeon Tester` displays the `IsPidgeon` component and allows users to get a prediction on whether an image is a pidgeon or not.
  - [] - `Show me my Birds` displays the `BirdList` component and displays a list of tested images.


### Level 2
### Save and Load Image Predictions to a Mongo Database
- [] - Implement a `POST` route that allows users to save prediction test results to a Mongo database.
- [] - Implement a `GET` route that allows users to load prediction test results from a Mongo database.
- [] - Refactor the `BirdList` component so that it shows prediction test results that are loaded from the database.
- [] - There should be no duplicate URLs in the database.

### Level 3
### Edit Image Predictions

- [] - Implement a `PATCH` route that allows users to edit a prediction test entry.
- [] - Allow users to click on an entry in `BirdList` and update information about that entry (Name, isPidgeonStatus)
- [] - Implement a `DELETE` route that allows users to delete a prediction test result.

### Level 4
### Sort Prediction Tests

- [] - Refactor your Mongoose schema to save the percentage confidence provided by the `isPidgeonTest` function and a `liked` status.
- [] - Implement a second `PATCH` route that allows users to like a specific prediction test.
- [] - Add a `I love this bird` button to prediction test entries that will set `liked` to true. Users should not be able to `like` prediction tests that are not pidgeons.
- [] - Implement a sort on your `BirdList` that will display prediction tests that have a higher pidgeon confidence higher in the list.
- [] - Implement a sort on your `BirdList` that will display prediction tests that are liked top of the list, regardless of pidgeon confidence.
- [] - Implement a `PercentagePidgeon` component that will display on the `BirdList` the percentage of prediction tests that are pidgeons. This percentage should automatically update when new tests are performed or a test is edited.

### Level 5
### Categorize Non-Pidgeon Tests

- [] - Using the information provided by the `predictions` object in the `isPidgeonTest` function (Will require a refactor of the .then block to get this information), save the prediction categorization of non-pidgeon images.
- [] - Create a drop down menu in `BirdList` that contains all existing categoriztions in the database. Allow users to view image prediction tests that only match the selected category. Tests should still be sorted by confidence interval, but only pidgeons can be liked.