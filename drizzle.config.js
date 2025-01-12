/** @type {import('drizzle-kit').Config} */
export default {
    dialect: 'postgresql', // Specify the dialect here
    schema: "./configs/schema.js",
    dbCredentials: {
        url: 'postgresql://neondb_owner:fyLWju9ml7bH@ep-cold-breeze-a1e7w2qc.ap-southeast-1.aws.neon.tech/ai-careerFocus?sslmode=require',
    },
};


