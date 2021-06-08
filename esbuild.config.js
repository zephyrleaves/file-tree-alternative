const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source visit the plugins github repository
*/
`;

const isProd = process.env.BUILD === "production";
const fs = require('fs');

let renamePlugin = {
    name: "rename-styles",
    setup(build) {
        build.onEnd(() => {
            const {outfile} = build.initialOptions;
            const outcss = outfile.replace(/\.js$/, ".css");
            const fixcss = outfile.replace(/main\.js$/, "styles.css");
            if (fs.existsSync(outcss)) {
                console.log("Renaming", outcss, "to", fixcss);
                fs.renameSync(outcss, fixcss);
            }
        });
    }
}

module.exports = {
    banner: { js: banner },
    sourcemap: isProd ? false : 'inline',
    minify: false,
    define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.BUILD),
    },
    plugins: [renamePlugin],
}