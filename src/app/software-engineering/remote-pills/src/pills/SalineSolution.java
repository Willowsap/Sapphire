package pills;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * Concrete strategy for generating a saline solution.
 * Remotely accessible on Java RMI.
 * 
 * @author Willow Sapphire
 * @version 10/18/2022
 */
public class SalineSolution extends UnicastRemoteObject implements SolutionGenerator {

    /**
     * Creates a saline solution strategy object.
     * 
     * @param port - the port on which to listen
     * @throws RemoteException - thrown if something goes wrong in the Java RMI
     */
    protected SalineSolution(int port) throws RemoteException {
        super(port);
    }

    @Override
    public String generateSolution() throws RemoteException {
        return "Saline";
    }
}
