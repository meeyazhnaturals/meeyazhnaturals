import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestConnection {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://db.ejpbbizfnexsrggstwht.supabase.co:5432/postgres?sslmode=require";
        String user = "postgres";
        String password = "Meeyazhnaturals@2026";

        System.out.println("Attempting to connect to: " + url);
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Connection successful!");
        } catch (SQLException e) {
            System.err.println("Connection failed!");
            e.printStackTrace();
        }
    }
}
