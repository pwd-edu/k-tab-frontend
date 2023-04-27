// function convertFileToBase64(fileInput: any){
//      // Get a reference to the file input
//     //  const fileInput = document.querySelector('input');

//      // Listen for the change event so we can capture the file
//      fileInput.addEventListener('change', (e: { target: { files: any[]; }; }) => {
//     // Get a reference to the file
//     const file = e.target.files[0];

//     // Encode the file using the FileReader API
//     const reader = new FileReader();
//     reader.onloadend = () => {
//         // Use as string to handle typescript types 
//         const result = reader.result as string ;
//         // Use a regex to remove data url part
//         const base64String = result.replace('data:', '').replace(/^.+,/, '') as string;

//         console.log(base64String);
//         // Logs wL2dvYWwgbW9yZ...
//         return base64String;
//     };
//     // reader.readAsDataURL(file);
    
//      });
// }

// export default convertFileToBase64;


function getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    const result = reader.result as string;
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return result;
}
export default getBase64;
 