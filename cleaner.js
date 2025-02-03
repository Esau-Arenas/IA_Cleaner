function agent_decision(position, condition) {
    if (condition === "DIRTY") return "CLEAN";
    return position === "A" ? "RIGHT" : "LEFT";
}

// Almacena los estados únicos visitados
let history = new Set();

function vacuum_simulation(env) {
    let currentPos = env[0];		
    let dirtStatus = currentPos === "A" ? env[1] : env[2];
    let action = agent_decision(currentPos, dirtStatus);

    // Registrar el estado actual
    let stateRecord = `${currentPos}-${env[1]}-${env[2]}`;
    history.add(stateRecord);

    document.getElementById("log").innerHTML += `<br>Location: ${currentPos} | Action: ${action} | States: ${history.size}`;

    // Ejecutar acción
    if (action === "CLEAN") {
        if (currentPos === "A") env[1] = "CLEAN";
        else env[2] = "CLEAN";
    } else {
        env[0] = action === "RIGHT" ? "B" : "A";
    }
    
    // Asegurar exploración completa al ensuciar ocasionalmente
    if (history.size < 8 && Math.random() < 0.4) {  
        let target = Math.random() < 0.5 ? 1 : 2;
        env[target] = "DIRTY";
    }

    // Finaliza si todos los estados han sido visitados
    if (history.size === 8) {
        document.getElementById("log").innerHTML += "<br><strong> Simulation complete.</strong>";
        return;
    }
    
    setTimeout(() => vacuum_simulation([...env]), 1000);
}

// Iniciar simulación
let initialState = ["A", "DIRTY", "DIRTY"];
vacuum_simulation(initialState);

