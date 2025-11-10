// Import the Node.js file system module for reading files
import fs from 'fs';
// Import the Node.js path module for handling file paths
import path from 'path';

// Create a constant that points to the 'data' directory relative to the current working directory
const dataDirectory = path.join(process.cwd(), 'data');


// Export a function that retrieves and returns all posts sorted alphabetically by title
export function getSortedPostsData(){

    // Construct the full file path to the posts.json file in the data directory
    const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString);
    // Sort the array of posts alphabetically by title using locale-aware string comparison
    jsonObj.sort(function(a,b) {
        return a.title.localeCompare(b.title);
    });
    // Transform each post object to ensure id is a string and return the modified array
    return jsonObj.map(item => {
        return {
            // Convert the id to a string to ensure consistent data type
            id: item.id.toString(),
            // Include the post title
            title: item.title,
            // Include the post date
            date:item.date,
            // Include the path to the post's image
            imagePath: item.imagePath,
            // Include the alt text for the post's image
            altText: item.altText,
            // Include the HTML content of the post
            contentHtml: item.contentHtml
        }
    });

}

// Export a function that returns all post IDs formatted for Next.js dynamic routing
export function getAllPostIds(){
    // Construct the full file path to the posts.json file in the data directory
    const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString);
    // Transform each post into an object with params structure required by Next.js getStaticPaths
    return jsonObj.map(item => {
        return {
            // Create a params object containing the post ID
            params: {
                // Convert the id to a string and assign it to the id parameter
                id: item.id.toString()
            }
        }
    });
}

// Export a function that retrieves a specific post by its ID
export function getPostData(id){
    // Construct the full file path to the posts.json file in the data directory
    const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString);
    // Filter the posts array to find the post with the matching ID
    const objReturned = jsonObj.filter(obj => {
        // Compare the post's ID (converted to string) with the provided ID parameter
        return obj.id.toString() === id;
    });
    // Check if no post was found with the given ID
    if (objReturned.length === 0) {
        // Return a default "not found" object with placeholder values
        return {
            id: "id",
            title: "Not found",
            date: "Not found",
            imagePath: "Not found",
            altText: "Not found",
            contentHtml: "Not found"
        }
    } else {
        // Return the first (and should be only) matching post object
        return objReturned[0]
    }

    }