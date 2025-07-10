Project Summary: Deploying and Managing Services in Kubernetes
This document outlines the key accomplishments from a project focused on deploying and managing stateful and stateless applications within a Kubernetes cluster. The project successfully moved from basic configurations to implementing robust, production-ready patterns, demonstrating a comprehensive understanding of core Kubernetes architecture.

Practical Implementation Highlights
The project involved several key hands-on implementations:

Stateful Application Management (StatefulSet): A MySQL database was deployed using a StatefulSet to ensure stable network identity and dedicated persistent storage (PersistentVolumeClaim), correcting an initial Deployment-based approach to prevent potential data corruption.

Automated Database Initialization (Job & ConfigMap): A Kubernetes Job was created to run a one-time initialization script for the database. The SQL script itself was managed using a ConfigMap, ensuring the database schema was prepared before the application attempted to connect.

Cluster-Wide Monitoring (DaemonSet): A DaemonSet was deployed to run the Prometheus Node Exporter on every node in the cluster, enabling comprehensive, node-level metric collection for monitoring purposes.

Comprehensive Kubernetes Concepts Utilized
Throughout the project, a broad range of Kubernetes components were utilized and understood, forming the foundation of the cluster's architecture.

Core Workloads & Networking
Pod: The fundamental unit of deployment, representing the running processes of our applications.

Deployment: Managed stateless application replicas, handling automated rollouts and scaling.

Service: Exposed applications running in Pods as stable network endpoints.

StatefulSet: Managed the stateful MySQL database, providing stable identity and storage.

DaemonSet: Ensured the node-exporter monitoring agent was present on every cluster node.

Job: Performed the one-time task of database schema initialization.

CronJob: Understood for its role in creating Jobs on a repeating schedule.

Ingress: Understood for managing external HTTP/HTTPS access to services within the cluster.

Configuration & Storage
ConfigMap: Stored non-sensitive configuration data, such as the database initialization script.

Secret: Securely managed sensitive data, including the MYSQL_ROOT_PASSWORD.

PersistentVolume (PV): The underlying storage resource provisioned for the cluster.

PersistentVolumeClaim (PVC): The request for storage made by the StatefulSet, which was bound to a PV.

Cluster-Level & Access Control
Namespace: Used to create a virtual cluster (microservices) to isolate project resources.

ServiceAccount: Understood as the identity for processes inside a Pod to interact with the Kubernetes API.

Role / ClusterRole: The distinction between namespace-specific and cluster-wide permissions was understood.

RoleBinding / ClusterRoleBinding: Understood as the mechanism to grant permissions defined in Roles to users or services.
