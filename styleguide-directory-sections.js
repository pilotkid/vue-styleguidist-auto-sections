var glob = require("glob")
var sections = [];

// CONFIGURATION VARIABLES
module.exports = {
    BasePath: './src/components/',
    BaseSectionTitle: "Miscellaneous",
    ComponentsRegex: "[A-Z]*.vue",
    verbose: true,
    getSections: function () {
        this.getDirectories(this.BasePath, PerformSectionAnalysis);//END GET DIRECTORIES
        return sections;
    },
    getDirectories: function (src, callback) {
        glob(src + '/**/', callback);
    }
}





function PerformSectionAnalysis(err, res) {

    if (err) {
        console.error('Error', err);
    }
    else {
        // PRINT THE DIRECTORY LISTING
        // IF WE ARE IN VERBOSE MODE
        if (this.verbose) {
            console.log(module.exports.BasePath);
            console.log(module.exports.BaseSectionTitle);
            console.log(module.exports.ComponentsRegex);
            console.log(module.exports.verbose);
            console.log(res);
        }

        // ITERATE THROUGH ALL OF THE 
        // DIRECTORIES IN THE BASEPATH
        res.forEach(fullpath => {
            // REMOVE THE BASE PATH AND SPLIT THE SUBDIRECTORIES 
            // INTO THEIR OWN ELEMENTS
            let path = fullpath.replace(module.exports.BasePath, '').split('/');

            // CLEAN UP THE PATH BY REMOVING EMPTY VALUES
            path.forEach(el => {
                if (el == '') {
                    path.pop();
                }
            });

            // IF THIS IS THE BASE DIR, ADD IT TO SECTIONS
            if (path.length == 0) {
                sections.push({
                    name: module.exports.BaseSectionTitle,
                    children: [],
                    components: module.exports.BasePath + module.exports.ComponentsRegex

                });

                // CONTINUE TO NEXT OBJECT IN THE LOOP
                return;
            }

            // GET THE NAME OF THE DIRECTORY IN USE
            let name = path[path.length - 1]

            // IF THE CURRENT PATH HAS A SUB DIRECTORY
            if (path.length > 1) {
                // GET THE PARENT DIRECTORY
                let findBase = path[path.length - 2];

                // LOCATE THE PARENT SECTION
                let sectionToAddTo = FindSection(findBase, sections);

                // IF THE SECTION WE ARE APPENDING
                // TO DOES NOT HAVE A SECTIONS ARRAY
                // ADD IT NOW
                if (!sectionToAddTo.sections) {
                    sectionToAddTo.sections = [];
                }

                // ADD THE NAME TO THE CHILDREN ARRAY FOR LOCATING LATER
                sectionToAddTo.children.push(name);

                // ADD THE SECTION TO THE SECTION WE
                // ARE APPENDING TO, WITH THE DIR
                // NAME AS THE TITLE, PREPARE THE 
                // CHILDREN ARRAY, AND TELL IT TO 
                // LOCATE THE COMPONETS IN THAT DIR
                sectionToAddTo.sections.push({
                    name: name,
                    children: [],
                    components: fullpath + module.exports.ComponentsRegex
                });

            }
            else {
                // OTHERWISE WE HAVE A NEW DIRECTORY
                // ADD THE DIRECTORY NAME, INIT CHILDREN
                // ARRAY AND SEARCH FOR ALL COMPONENTS 
                // IN THE BASE DIRECTORY
                sections.push({
                    name: name,
                    children: [],
                    components: fullpath + module.exports.ComponentsRegex

                });
            }


        });// END FOREACH FOLDER

        // IF WE ARE IN VERBOSE MODE PRINT THE SECTIONS TREE
        if (module.exports.verbose) {
            console.log(JSON.stringify(sections, null, "\t"));
        }
    }// END IF IN ERROR
}

function FindSection(SectionName, Sections) {
    // IF THERE ARE NO SECTIONS 
    // SEACH FOR LOCATION OF THE 
    // CHILD ELEMENT HAS FAILED
    if (!Sections) { return false; }

    let toReturn = null;

    Sections.forEach(section => {
        // CHECK IF THE CHILDREN OF THAT ELEMENT 
        // CONTAINS THE SECTION NAME WE ARE SEARCHING 
        // FOR IF IT DOES RECURSIVLY LOOK AT THAT SECTION
        // AND RETURN THE SECTION
        if (section.children.includes(SectionName)) {
            toReturn = FindSection(SectionName, section.sections)
        }

        // CHECK IF THE CURRENT SECTION MATCHES 
        // THE SECTION NAME WE ARE LOOKING FOR, 
        // IF SO RETURN THE SECTION
        if (section.name == SectionName) {
            toReturn = section;
        }


        // IF WE DID NOT FIND THE SECTION        
        if (toReturn == null) {
            // IF WE HAVE CHILDREN IN THIS SECTION   
            if (section.children.length > 1) {

                //CONTINUE SEARCH DOWN THE CHILDREN OF THIS SECTION
                FindSection(SectionName, section.sections)
            }
        }
    });

    // RETURN WHAT WE FOUND, IF ANYTHING
    return toReturn;
}