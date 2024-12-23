import { createClient } from "@supabase/supabase-js";

// Crear cliente Supabase usando las variables de entorno
const supabase = createClient(
  process.env.SUPABASE_URL, // URL de Supabase
  process.env.SUPABASE_ANON_KEY // Clave pública de Supabase (anon key)
);

// Ejemplo de consulta a una tabla 'todos'
const fetchTodos = async () => {
  const { data, error } = await supabase.from("todos").select(); // Obtener todos los registros de la tabla 'todos'

  if (error) {
    console.error("Error al obtener los datos:", error.message);
  } else {
    console.log("Datos:", data);
  }
};

fetchTodos();
