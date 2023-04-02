package pills;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * Strategy for generating active ingredients.
 * Remotely accessible on Java RMI.
 * 
 * @author Willow Sapphire
 * @version 10/18/2022
 */
interface ActiveGenerator extends Remote {

    /**
     * Creates the active ingredient.
     * 
     * @return a string representing the active ingredient.
     */
    public String generateActive() throws RemoteException;
}
