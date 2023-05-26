
let root_folder = { 
    wow: { 
     file0: 'awesome1.js',
     file1: 'awesome2.js',
     file2: 'awesome3.js',
     file3: 'awesome4.js',
     file4: 'awesome5.js',
     file5: 'awesome6.js',
     file6: 'awesome7.js',
      cool: { 
       file0: 'awesome1.js',
       file1: 'awesome2.js',
       file2: 'awesome3.js',
       file3: 'awesome4.js',
       file4: 'awesome5.js',
       file5: 'awesome6.js',
       file6: 'awesome7.js',
        laugh: { 
         file0: 'awesome1.js',
         file1: 'awesome2.js',
         file2: 'awesome3.js',
         file3: 'awesome4.js',
         file4: 'awesome5.js',
         file5: 'awesome6.js',
         file6: 'awesome7.js'
        }
      }
    },
    nice: { 
     file0: 'awesome1.js',
     file1: 'awesome2.js',
     file2: 'awesome3.js',
     file3: 'awesome4.js',
     file4: 'awesome5.js',
     file5: 'awesome6.js',
     file6: 'awesome7.js'
    }
}

function recurse(folders_, path_) {
 for (const [key, value] of Object.entries(folders_)) {
  if(typeof(value) === 'object') { 
   path_.push(`${key}/`)
   recurse(value, path_);
   path_.pop();
  } else {
   console.log(path_.join('') + value);
  }
 }
}

function delete_file(folders_, path_, file_to_delete_) { 
 for (const [key, value] of Object.entries(folders_)) {
  if(typeof(value) === 'object') { 
   path_.push(`${key}/`)
   delete_file(value, path_, file_to_delete_);
   path_.pop();
  } else {
     if((path_.join('') + value) === file_to_delete_) { 
       delete folders_[key];
       return;
     }  
  }
 }
}

function delete_folder(folders_, path_, folder_to_delete_) { 
 for (const [key, value] of Object.entries(folders_)) {
  if(typeof(value) === 'object') { 
   path_.push(`${key}/`)
   if(path_.join('') === folder_to_delete_) { 
     delete folders_[key];
     return;
   }
   delete_folder(value, path_, folder_to_delete_);
   path_.pop();
  }
 }
}

function add_file(folders_, path_, folder_to_insert_, file_name_) { 
 for (const [key, value] of Object.entries(folders_)) {
  if(typeof(value) === 'object') { 
   path_.push(`${key}/`)
   if(path_.join('') === folder_to_insert_) { 
    let f_count = 0;
    for (const [key2, file] of Object.entries(folders_[key])) {
     f_count += 1;
     if(typeof(file) === 'string' && file === file_name_) { 
      console.log('file already exists');
      return;
     }
    }
    folders_[key][`file${f_count}`] = file_name_; 
    return;
   }
   add_file(value, path_, folder_to_insert_, file_name_);
   path_.pop();
  }
 }
 if(path_.length === 1) { 
  console.log('folder to insert does not exist');
 }
}

function add_folder(folders_, path_, folder_to_insert_, folder_name_) { 
 for (const [key, value] of Object.entries(folders_)) {
  if(typeof(value) === 'object') { 
   path_.push(`${key}/`)
   if(path_.join('') === folder_to_insert_) { 
    for (const [key2, file] of Object.entries(folders_[key])) {
     if(typeof(file) === 'object' && key2 === folder_name_) { 
      console.log('folder already exists');
      return;
     }
    }
    folders_[key][folder_name_] = {
     file0: 'aweosme1.js'
    }; 
    return;
   }
   add_folder(value, path_, folder_to_insert_, folder_name_);
   path_.pop();
  }
 }
 if(path_.length === 1) { 
  console.log('folder to insert does not exist');
 }
}

function copy_file_to() { 
    
}

delete_file(root_folder, ['/root_folder/'], '/root_folder/wow/awesome7.js');
delete_folder(root_folder, ['/root_folder/'], '/root_folder/wow/cool/laugh/');
add_file(root_folder, ['/root_folder/'], '/root_folder/wow/cool/', 'awesome8.js');
add_folder(root_folder, ['/root_folder/'], '/root_folder/wow/cool/', 'sick');
recurse(root_folder, ['/root_folder/']);
