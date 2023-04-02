package pills;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * Strategy for generating casings.
 * Remotely accessible on Java RMI.
 * 
 * @author Willow Sapphire
 * @version 10/18/2022
 */
interface CasingGenerator extends Remote {

    /**
     * Creates the casing.
     * 
     * @return a string representing the casing.
     */
    public String generateCasing() throws RemoteException;
}