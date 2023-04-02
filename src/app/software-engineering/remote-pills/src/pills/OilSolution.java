package pills;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * Concrete strategy for generating an oil solution.
 * Remotely accessible on Java RMI.
 * 
 * @author Willow Sapphire
 * @version 10/18/2022
 */
public class OilSolution extends UnicastRemoteObject implements SolutionGenerator {

    /**
     * Creates a oil solution strategy object.
     * 
     * @param port - the port on which to listen
     * @throws RemoteException - thrown if something goes wrong in the Java RMI
     */
    protected OilSolution(int port) throws RemoteException {
        super(port);
    }

    @Override
    public String generateSolution() {
        return "Oil";
    }
}
