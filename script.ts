document.getElementById("resumeForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
 
    //type assertion
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;
 
 
 
    
 
 
    if (profilePictureInput && nameElement && emailElement && phoneElement
        && educationElement && experienceElement && skillsElement) {
 
     const name = nameElement.value;
     const email = emailElement.value;
     const phone = phoneElement.value;
     const education = educationElement.value;
     const experience = experienceElement.value;
     const skills = skillsElement.value;
 
    
 
     
    //profilePicture elements
 
    const profilePictureFile = profilePictureInput.files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
    
    
    //create resume output
    const resumeHTML = `
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" 
    class="profilePicture">` : ""}
    <h3>Personal Information</h3>
    <p><strong>Name:</strong> ${name} </p>
    <p><strong>Email:</strong> ${email} </p>
    <p><strong>phone Number:</strong> ${phone} </p>
 
 
    <h3>Education</h3>
    <p">${education}</p>
 
    <h3>Work Experience</h3>
    <p>${experience}</p>
 
    <h3>Skills</h3>
    <p>${skills}</p>
 
    `;
        
 
 
 
 //display the resume output
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
     resumeOutputElement.innerHTML = resumeHTML;
     resumeOutputElement.classList.remove("hidden");
 
     //container button
     const buttonsContainer = document.createElement("div");
     buttonsContainer.id = "buttonsContainer";
     resumeOutputElement.appendChild(buttonsContainer);
 
     //PDF button
     const downloadButton = document.createElement("button");
     downloadButton.textContent = "Download as PDF";
     downloadButton.addEventListener("click", () => {
       window.print();
     });
     buttonsContainer.appendChild(downloadButton);
 
     //Shareable Link
     const shareLinkButton = document.createElement("button");
     shareLinkButton.textContent = "Copy Shareable Link";
     shareLinkButton.addEventListener("click", async () => {
       try {
          const shareableLink = `https://yourdomain.com/resumes/${name.replace(
             /\s+/g,
             "_"
           )}_cv.html`;
 
 
    //Clipboard
        await navigator.clipboard.writeText(shareableLink);
        alert("Shareable link copied to clipboard!");
 
       } catch (err) {
          console.error("Failed to copy link: ", err);
          alert("Failed to copy link to clipboard. Please try again.");
       }
      });
      buttonsContainer.appendChild(shareLinkButton);
    } else {
       console.error("Resume output container not found");
 
    }
 } else {
    console.error("Form elements are missing");
 }
 });