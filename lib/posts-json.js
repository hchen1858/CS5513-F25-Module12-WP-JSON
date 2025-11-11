// Import the Node.js file system module for reading files
//import fs from 'fs';
// Import the Node.js path module for handling file paths
//import path from 'path';

// MUST have installed got npm via npm install got@9.6.0
import got from 'got';


// Create a constant that points to the 'data' directory relative to the current working directory
//const dataDirectory = path.join(process.cwd(), 'data');

// Define URL for REST endpoint
const dataURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/twentytwentyfive-child/v1/latest-posts/1";


// Export a function that retrieves and returns all posts sorted alphabetically by title
export async function getSortedPostsData(){

    // Construct the full file path to the posts.json file in the data directory
    //const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    //const jsonString = fs.readFileSync(filePath, 'utf8');
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(dataURL);
        // Display the response body as a string
        console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);

    // Sort the array of posts alphabetically by title using locale-aware string comparison
    jsonObj.sort(function(a,b) {
        return a.post_title.localeCompare(b.post_title);
    });
    // Transform each post object to ensure id is a string and return the modified array
    return jsonObj.map(item => {
        return {
            // Convert the id to a string to ensure consistent data type
            id: item.ID.toString(),
            // Include the post title
            title: item.post_title,
            // Include the post date
            date:item.post_date,
            // Include the path to the post's image
            //imagePath: item.imagePath,
            // Include the alt text for the post's image
            //altText: item.altText,
            // Include the HTML content of the post
            //contentHtml: item.contentHtml
        }
    });

}

// Export a function that returns all post IDs formatted for Next.js dynamic routing
export async function getAllPostIds(){
    // Construct the full file path to the posts.json file in the data directory
    //const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    //const jsonString = fs.readFileSync(filePath, 'utf8');

    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(dataURL);
        // Display the response body as a string
        console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);

    // Transform each post into an object with params structure required by Next.js getStaticPaths
    return jsonObj.map(item => {
        return {
            // Create a params object containing the post ID
            params: {
                // Convert the id to a string and assign it to the id parameter
                id: item.ID.toString()
            }
        }
    });
}

// Export a function that retrieves a specific post by its ID
export async function getPostData(id){
    // Construct the full file path to the posts.json file in the data directory
    //const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    //const jsonString = fs.readFileSync(filePath, 'utf8');
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(dataURL);
        // Display the response body as a string
        console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);
    // Filter the posts array to find the post with the matching ID
    const objReturned = jsonObj.filter(obj => {
        // Compare the post's ID (converted to string) with the provided ID parameter
        return obj.ID.toString() === id;
    });
    // Check if no post was found with the given ID
    if (objReturned.length === 0) {
        // Return a default "not found" object with placeholder values
        return {
            id: "id",
            post_title: "Not found",
            post_date: "Not found",
            //imagePath: "Not found",
            //altText: "Not found",
            //contentHtml: "Not found"
        }
    } else {
        // Return the first (and should be only) matching post object
        return objReturned[0]
    }

    }