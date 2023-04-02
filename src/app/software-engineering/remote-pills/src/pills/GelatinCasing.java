package pills;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * Concrete strategy for generating gelatin casings.
 * Remotely accessible on Java RMI.
 * 
 * @author Willow Sapphire
 * @version 10/18/2022
 */
public class GelatinCasing extends UnicastRemoteObject implements CasingGenerator {

    /**
     * Creates a gelatin casing strategy object.
     * 
     * @param port - the port on which to listen
     * @throws RemoteException - thrown if something goes wrong in the Java RMI
     */
    protected GelatinCasing(int port) throws RemoteException {
        super(port);
    }

    @Override
    public String generateCasing() throws RemoteException {
        return "Gelatin";
    }
}