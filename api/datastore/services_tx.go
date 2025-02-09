package datastore

import (
	portainer "github.com/portainer/portainer/api"
	"github.com/portainer/portainer/api/dataservices"
)

type StoreTx struct {
	store *Store
	tx    portainer.Transaction
}

func (tx *StoreTx) IsErrObjectNotFound(err error) bool {
	return tx.store.IsErrObjectNotFound(err)
}

func (tx *StoreTx) CustomTemplate() dataservices.CustomTemplateService { return nil }

func (tx *StoreTx) EdgeGroup() dataservices.EdgeGroupService {
	return tx.store.EdgeGroupService.Tx(tx.tx)
}

func (tx *StoreTx) EdgeJob() dataservices.EdgeJobService     { return nil }
func (tx *StoreTx) EdgeStack() dataservices.EdgeStackService { return nil }

func (tx *StoreTx) Endpoint() dataservices.EndpointService {
	return tx.store.EndpointService.Tx(tx.tx)
}

func (tx *StoreTx) EndpointGroup() dataservices.EndpointGroupService           { return nil }
func (tx *StoreTx) EndpointRelation() dataservices.EndpointRelationService     { return nil }
func (tx *StoreTx) FDOProfile() dataservices.FDOProfileService                 { return nil }
func (tx *StoreTx) HelmUserRepository() dataservices.HelmUserRepositoryService { return nil }
func (tx *StoreTx) Registry() dataservices.RegistryService                     { return nil }
func (tx *StoreTx) ResourceControl() dataservices.ResourceControlService       { return nil }
func (tx *StoreTx) Role() dataservices.RoleService                             { return nil }
func (tx *StoreTx) APIKeyRepository() dataservices.APIKeyRepository            { return nil }
func (tx *StoreTx) Settings() dataservices.SettingsService                     { return nil }
func (tx *StoreTx) Snapshot() dataservices.SnapshotService                     { return nil }
func (tx *StoreTx) SSLSettings() dataservices.SSLSettingsService               { return nil }
func (tx *StoreTx) Stack() dataservices.StackService                           { return nil }
func (tx *StoreTx) Tag() dataservices.TagService                               { return nil }
func (tx *StoreTx) TeamMembership() dataservices.TeamMembershipService         { return nil }
func (tx *StoreTx) Team() dataservices.TeamService                             { return nil }
func (tx *StoreTx) TunnelServer() dataservices.TunnelServerService             { return nil }
func (tx *StoreTx) User() dataservices.UserService                             { return nil }
func (tx *StoreTx) Version() dataservices.VersionService                       { return nil }
func (tx *StoreTx) Webhook() dataservices.WebhookService                       { return nil }
