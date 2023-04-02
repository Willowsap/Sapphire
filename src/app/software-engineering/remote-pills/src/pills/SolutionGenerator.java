package pills;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * Strategy for generating solutions.
 * Remotely accessible on Java RMI.
 * 
 * @author Willow Sapphire
 * @version 10/18/2022
 */
interface SolutionGenerator extends Remote {

    /**
     * Creates the solution.
     * 
     * @return a string representing the solution.
     */
    public String generateSolution() throws RemoteException;
}