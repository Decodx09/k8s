This project focuses on deploying and managing stateful and stateless applications within a Kubernetes cluster. Starting from basic setups, it evolved into a production-grade system architecture—demonstrating practical skills and deep understanding of Kubernetes core concepts.

Practical Implementation Highlights
1. Stateful Application Management – MySQL via StatefulSet
Deployed MySQL using a StatefulSet to maintain stable network identity.

Ensured dedicated PersistentVolumeClaim (PVC) for safe and persistent storage.

Refactored from an initial Deployment setup to avoid data corruption risks.

2. Automated Database Initialization – Job + ConfigMap
Used a Kubernetes Job for one-time schema setup.

Managed the SQL script with a ConfigMap, ensuring schema readiness before app connection.

3. Cluster-Wide Monitoring – Prometheus Node Exporter via DaemonSet
Deployed a DaemonSet to run Prometheus Node Exporter on each cluster node.

Enabled real-time, node-level metrics collection.

Everything I have stated here is included in this Project, this is all you need to get started with K8s

| Component     | Role                                                             |
| ------------- | ---------------------------------------------------------------- |
| `Pod`         | Base execution unit – represents application processes.          |
| `Deployment`  | Manages stateless app replicas with rolling updates and scaling. |
| `Service`     | Provides a stable endpoint for app access inside the cluster.    |
| `StatefulSet` | Manages MySQL with stable identity and persistent storage.       |
| `DaemonSet`   | Ensures monitoring agent runs on every node.                     |
| `Job`         | Handles one-time database schema setup.                          |
| `CronJob`     | Understood for periodic job execution.                           |
| `Ingress`     | Understood for routing external HTTP/HTTPS traffic to services.  |

| Component                     | Role                                               |
| ----------------------------- | -------------------------------------------------- |
| `ConfigMap`                   | Stores config like SQL init script.                |
| `Secret`                      | Secures sensitive data like `MYSQL_ROOT_PASSWORD`. |
| `PersistentVolume (PV)`       | Provides storage for the cluster.                  |
| `PersistentVolumeClaim (PVC)` | Requests and binds storage to a StatefulSet.       |

| Component                          | Role                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| `Namespace`                        | Creates virtual clusters to isolate project components. |
| `ServiceAccount`                   | Pod identity for Kubernetes API interactions.           |
| `Role / ClusterRole`               | Namespace-scoped vs cluster-wide permissions.           |
| `RoleBinding / ClusterRoleBinding` | Grants permissions from roles to users or services.     |
