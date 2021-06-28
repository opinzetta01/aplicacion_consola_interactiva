require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

  //  await pausa();


    do {
        opt = await inquireMenu();
        
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            
            case '2':
                tareas.listadoCompleto();
            break;
            
            case '3':
                // crear opcion
                tareas.listarPendienteCompletada(true);
            break;
            
            case '4':
                // crear opcion
                tareas.listarPendienteCompletada(false);
             break;
            
             case '5':
                // crear opcion
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids); 
            break;
            
            case '6':
                // crear opcion
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0'){
                    const ok = await confirmar('¿Está usted seguro de borrar la tarea?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
            
            case '0':
                // crear opcion
            break;
        
            
        }

        guardarDB(tareas.listadoArr);

        
        await pausa();

    } while (opt !== '0');

}
    
main();