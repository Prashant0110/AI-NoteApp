// const btn=document.querySelector('.btn');
// const container=document.querySelector('.container')

// btn.addEventListener('click',addNewNote);

// function addNewNote()

// {
//     let text=document.querySelector('#txts');
//     const cloneEle=text.cloneNode(true);

//     cloneEle.value="";

//     container.insertBefore(cloneEle,btn);
//     cloneEle.addEventListener('dblclick',function(){
//         alert('Are you sure want to delete this?')
//         remove(cloneEle);
//     });
// }
    
//      function remove(texttoRemove)
//     {
        
//        if(document.contains(texttoRemove))
//         {
//             texttoRemove.remove();
//         }
//     }
    
// ----------------------------------------------------------------------



const btn=document.querySelector('#btns');
const text=document.querySelector('#txts');


document.addEventListener('DOMContentLoaded', () => {
    initiateSpeechRecognition();
});

function initiateSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript.toLowerCase();

            if (result.includes('new text area')) {
                addNew();
            }

            if (result.includes('delete it')) {
                deleteList(); 
            }
        };
        
        recognition.start();
    };
};



// Alternative--------------------------------------------------(AUTO)

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.lang = 'en-US';
// recognition.interimResults = false;

// recognition.onresult = (event) => {
//     const result = event.results[0][0].transcript.toLowerCase();
    

//     if(result.includes('new text area'))
//     {
//         addNew();
//     }

//     if(result.includes('delete it'))
//     {
//         deleteList();
//     }
// }

// btn.addEventListener('click',()=>
// {
//     recognition.start();
// })


const newNote=[];
getNotes().forEach((note) => {

    const updatedElem=createNoteElem(note.id,note.content);    
    newNote.push(updatedElem);
});



function createNoteElem(id, content)
{
    let txtArea=document.createElement('textarea');
    txtArea.classList.add('txt');
    txtArea.placeholder="Write here";
    txtArea.value=content;
    const container=document.querySelector('.container');

    container.insertBefore(txtArea,btn);
    txtArea.addEventListener('dblclick',()=>{
        deleteList(txtArea);
    });

    txtArea.addEventListener('input',()=>
    {
        updatedElem(id,txtArea.value);
    })
    
}


function updatedElem(id,content)
{
    const elem=getNotes();
    const target=elem.find(notes=>
        {
            return notes.id===id;
        
        })
        if(target)
        {
            target.content=content;
            savedItems(elem);
        }

}

function deleteList(txtArea)
{
    const warning=confirm('do you want to delete it??');
    if(warning)
    {
        deleteNode(txtArea);
        txtArea.remove();
    }
  
}

function deleteNode(txtArea)
{
    const getId=txtArea.dataset.id;
    const dataNote=getNotes().filter(noteId=>{
       return noteId.id!=getId;
    })
    savedItems(dataNote);
}




btn.addEventListener('click',addNew);

function addNew()
{
    const note=getNotes();
   const  myobj=
    {
        id:Math.floor(Math.random()*999),
        content:'',
    };

    note.push(myobj);

    savedItems(note);

  
    const noteEle=createNoteElem(myobj.id,myobj.content);
}

function savedItems(note)
{    
    localStorage.setItem('notes',JSON.stringify(note));

}

function getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]");
}
// function getnotes() {
//     const storedNotes = localStorage.getItem('notes');
//     return storedNotes ? [JSON.parse(storedNotes)] : [];
// }




