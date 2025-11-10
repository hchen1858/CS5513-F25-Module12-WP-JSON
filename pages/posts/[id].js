// Import the Layout component for consistent page structure
import Layout from '../../components/layout'; 
// Import utility functions to get all post IDs and individual post data
import { getAllPostIds, getPostData } from '../../lib/posts-json';
// Import Next.js Head component for managing page metadata
import Head from 'next/head';
// Import custom Date component for formatting dates
import Date from '../../components/date';
import Image from 'next/image';
// Import utility CSS styles for consistent styling
import utilStyles from '../../styles/utils.module.css'; 


// Next.js static generation function that runs at build time
// This function fetches data for a specific post based on the dynamic route parameter
export async function getStaticProps({ params }) {
    // Extract post data asynchronously using the post ID from the URL parameter
    // The "await" keyword ensures we wait for the data to be fetched before proceeding
    const postData = await getPostData(params.id);
   
    // Return the post data as props to be passed to the Post component
    return {
      props: {
        postData,
      },
    };
  }

 
// Next.js static generation function that determines which paths to pre-render
// This function tells Next.js which dynamic routes should be statically generated at build time
export async function getStaticPaths() {
  // Get all available post IDs to determine which pages to generate
  const paths = getAllPostIds();
  return {
    paths, // Array of paths to pre-render
    fallback: false, // If a path is not found, return 404 (no fallback generation)
  };
}

// Main React component that renders an individual blog post
// Receives postData as props from getStaticProps
export default function Post({ postData }) {
    return (
      // Wrap the content in the Layout component for consistent page structure
      <Layout>
        {/* Use Next.js Head component to set the page title dynamically */}
        <Head>
          <title>{postData.title}</title>
        </Head>
        {/* Main article container with blog-specific styling */}
        <article className={utilStyles.blogArticle}>
          {/* Display the post title as the main heading */}
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          {/* Date container with custom styling */}
          <div className={utilStyles.dateTextPost}>
            {/* Use custom Date component to format and display the post date */}
            <Date dateString={postData.date} />
          </div>
          {/* Render the post content as HTML (converted from Markdown) */}
          {/* dangerouslySetInnerHTML is used because the content is trusted HTML from our build process */}
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <div className={utilStyles.friendImage}>
            <Image
                priority
                src= {postData.imagePath}
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt= {postData.altText}
              />
          </div>
        </article>
      </Layout>
    );
  }
