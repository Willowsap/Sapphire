package pills;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * Concrete strategy for generating Acetaminophen.
 * Remotely accessible on Java RMI.
 * 
 * @author Willow Sapphire
 * @version 10/18/2022
 */
public class AcetaminophenActive extends UnicastRemoteObject implements ActiveGenerator {

    /**
     * Creates an Acetaminophen active strategy object.
     * 
     * @param port - the port on which to listen
     * @throws RemoteException - thrown if something goes wrong in the Java RMI
     */
    protected AcetaminophenActive(int port) throws RemoteException {
        super(port);
    }

    @Override
    public String generateActive() throws RemoteException{
        return "Acetaminophen";
    }
}
