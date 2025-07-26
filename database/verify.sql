-- Verificar que la tabla existe y tiene RLS habilitado
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'users';

-- Verificar que las políticas están creadas
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'users';

-- Probar insertar un usuario de prueba
INSERT INTO users (username, email, password) 
VALUES ('test_user', 'test@example.com', 'hashed_password');

-- Verificar que se insertó correctamente
SELECT id, username, email, created_at FROM users WHERE username = 'test_user';
